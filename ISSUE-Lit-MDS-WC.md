# MDS Web Component SSR Issue

- Can't import as normal import. It's throwing below Error

```js
// import { McButton } from "@maersk-global/mds-react-web-components";
```

<img width="1438" alt="Screenshot 2021-10-13 at 1 35 44 PM" src="https://user-images.githubusercontent.com/88817537/137114857-2cde4cec-c541-453a-8c93-97171ed801ff.png">

- With Nextjs dynamic import its only working in Client side rendering with fallback and `ssr:false`

```js
// src/pages/index.tsx
// Adding @ts-ignore - Typescript throwing error

// clint side render
const McButton = dynamic(
  // @ts-ignore
  () => import("@maersk-global/mds-react-web-components").then(({ McButton }) => McButton),
  {
    loading: () => <p>McButton Loading - fallback ssr</p>,
    ssr: false,
  }
);

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>test</title>
        <meta name="description" content="test Flow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div data-testid="text-anchor">Button test - ssr</div>
      <div>
        <McButton
          // @ts-ignore
          click={(): void => {
            alert("clicked");
          }}
          variant="filled"
          icon="star"
          iconposition="left"
        >
          Hello!!
        </McButton>
      </div>

      <Card />
    </div>
  );
};

export default Home;
```

PFA for more info and code available in src/pages/index.tsx
<img width="1429" alt="Screenshot 2021-10-13 at 2 29 06 PM" src="https://user-images.githubusercontent.com/88817537/137115105-a70ddec1-848b-4dc7-955f-93c74e23873f.png">
<img width="937" alt="Screenshot 2021-10-13 at 2 30 28 PM" src="https://user-images.githubusercontent.com/88817537/137115209-ef4d2149-415f-43af-bd17-073343373b80.png">
<img width="792" alt="Screenshot 2021-10-13 at 2 38 07 PM" src="https://user-images.githubusercontent.com/88817537/137115227-673bb642-130c-4e8d-bab7-6ff49b1f7031.png">
