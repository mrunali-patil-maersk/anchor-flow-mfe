import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Input,
  Button,
  LoadingIndicator,
  Table,
  Typography,
  Tooltip,
} from "@anchor/react-components";
import { unionBy } from "lodash";
import useDebounce from "@hooks/useDebounce";
import { useAppSelector } from "src/redux/hook";
import { selectUser } from "src/redux/selectors/userSelector";
import { buildAPIConfig } from "src/components/header/graphApis";
import InfoBox from "@/components/tasklist/infoBox";

import { GroupMemberContainer, MemberDataWrapper, TableBox } from "@styles/pages/groups.style";
import { MainHeading } from "@styles/components/decisionsList/decisionsList.style";

// constants
import { userPrimaryKey, userColumnData } from "@/configs/users.constant";
import {
  commonGraphEndPoint,
  graphMsBaseApiUrlV1,
  groupsMembersByIdGraphApiUrl,
} from "@/configs/apis/apiEndPoints";
import { callApi } from "@/configs/apis/axiosAPI";

interface MemberType {
  member_id: string;
  email: string;
  first_name: string;
  last_name: string;
}

const getMemberByGroupIdWithPagesize = async (
  groupId: string,
  nextLink: string | undefined,
  top: number,
  search?: string
) => {
  try {
    const options = await buildAPIConfig("get");
    const params = new URLSearchParams({
      $count: "true",
      $select: "givenName,surname,id,mail,displayName",
      $top: top.toString(),
      ...(search && { $search: `"displayName:${search}"` }),
    });
    const url =
      search || !nextLink
        ? `${groupsMembersByIdGraphApiUrl(groupId)}?${params}`
        : nextLink.replace(graphMsBaseApiUrlV1, commonGraphEndPoint);
    const response = await callApi(url, {
      ...options,
      headers: {
        consistencylevel: "eventual",
      },
    });
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const useMemberFetch = (groupId) => {
  const [memberData, setMemberData] = useState<Array<MemberType>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [nextLink, setNextLink] = useState<string | undefined>();
  const [error, setError] = useState<any>({});
  const [loadMore, setLoadMore] = useState(false);
  const [totalMembersCount, setTotalMembersCount] = useState(0);
  const [search, setSearch] = useState("");
  const debouncedSearchTerm: string = useDebounce<string>(search, 500);

  const loadData = useCallback(
    async (isMounted: boolean, groupId, debouncedSearchTerm?: string, nextLink?: string) => {
      try {
        if (!groupId) return;
        setIsLoading(true);
        setIsError(false);
        if (debouncedSearchTerm !== undefined && !nextLink) {
          setMemberData([]);
        }
        const data = await getMemberByGroupIdWithPagesize(
          groupId,
          nextLink,
          15,
          debouncedSearchTerm
        );
        if (isMounted) {
          if (data?.error) {
            setIsError(true);
            setError(data.error);
          } else {
            //

            if (data?.value) {
              const membersDetails: Array<MemberType> = data?.value.map(
                ({ givenName, surname, id, mail, displayName }) => ({
                  member_id: id,
                  email: mail,
                  first_name: givenName || displayName,
                  last_name: surname,
                })
              );

              setMemberData((prevData) => unionBy(prevData, membersDetails, "member_id"));
              if (!nextLink) {
                setTotalMembersCount(data["@odata.count"] || 0);
              }
            }
            setNextLink(data["@odata.nextLink"]);
          }
        }
      } catch (err) {
        if (isMounted) {
          setIsError(true);
          setError(err as any);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setLoadMore(false);
        }
      }
    },
    []
  );
  useEffect(() => {
    let isMounted = true;
    loadData(isMounted, groupId);
    return () => {
      isMounted = false;
    };
  }, [groupId, loadData]);
  useEffect(() => {
    let isMounted = true;
    if (loadMore) {
      loadData(isMounted, groupId, debouncedSearchTerm, nextLink);
    }
    return () => {
      isMounted = false;
    };
  }, [loadMore, groupId, loadData]);

  useEffect(() => {
    let isMounted = true;
    loadData(isMounted, groupId, debouncedSearchTerm);
    return () => {
      isMounted = false;
    };
  }, [debouncedSearchTerm, groupId, loadData]);

  return {
    memberData,
    isLoading,
    isError,
    error,
    nextLink,
    totalMembersCount,
    search,
    loadMore,
    setSearch,
    setLoadMore,
  };
};

const GroupMembers = () => {
  const { groups } = useAppSelector(selectUser);
  const {
    query: { groupId },
  } = useRouter();

  const {
    memberData,
    isLoading,
    isError,
    error,
    nextLink,
    totalMembersCount,
    loadMore,
    search,
    setSearch,
    setLoadMore,
  } = useMemberFetch(groupId);

  const group = useMemo(() => {
    return groups.find((group) => group.id === groupId);
  }, [groupId, groups]);
  const displayName = group?.displayName ?? "--";

  const handleLoadMore = () => {
    setLoadMore(true);
  };

  const handleOnChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSearch(e.target.value);
  };
  const handleResetSearch = () => {
    setSearch("");
  };

  return (
    <GroupMemberContainer>
      <Tooltip apperance="inverted" content={displayName} position="top" width="auto">
        <MainHeading fontStyle="normal" variant="h3">
          {displayName}
        </MainHeading>
      </Tooltip>
      <MemberDataWrapper mt={16} p={24}>
        <Box mb={16}>
          <Input
            clearButton
            icon="magnifying-glass"
            iconPosition="left"
            id="group_member_search"
            placeholder="Search member by name"
            variant="default"
            value={search}
            onChange={handleOnChangeSearch}
            onClear={handleResetSearch}
          />
        </Box>
        <Box>
          {isError && error && !isLoading ? (
            <Box height="50vh" display="grid" alignItems="start">
              <InfoBox type="error" text={error?.message || "Something went wrong!"} />
            </Box>
          ) : isLoading && !loadMore ? (
            <Box height="50vh" display="grid" alignItems="center">
              <LoadingIndicator label="Loading" hiddenlabel={true} variant="spinner" />
            </Box>
          ) : (
            <Box>
              <TableBox>
                <Table
                  defaultColumns={userColumnData}
                  primaryKey={userPrimaryKey}
                  rowData={memberData}
                  fullWidthTable
                  className="table"
                />
              </TableBox>
            </Box>
          )}
          <Box mt={16} display="flex" position="relative" justifyContent="center">
            <Box display="flex">
              <Button
                disabled={!nextLink}
                variant="outlined"
                label="Show more"
                icon="chevron-down"
                size="medium"
                loading={loadMore}
                onClick={handleLoadMore}
              />
            </Box>
            <Box display="flex" position="absolute" right="0" color="functional.grey.800">
              <Typography fontStyle="normal" variant="body2">
                Showing{" "}
                <Typography
                  fontStyle="bold"
                  variant="body2"
                >{`${memberData.length} of ${totalMembersCount}`}</Typography>{" "}
                items
              </Typography>
            </Box>
          </Box>
        </Box>
      </MemberDataWrapper>
    </GroupMemberContainer>
  );
};

GroupMembers.requireAuth = true;
export default GroupMembers;
