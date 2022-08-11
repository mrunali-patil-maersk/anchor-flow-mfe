const Home = () => {
  return <div>Home Page</div>;
};

// Protected routes

Home.requireAuth = true;
export default Home;
