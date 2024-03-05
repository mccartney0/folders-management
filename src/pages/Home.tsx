import Layout from '../components/layout/Layout';
import DirectoryComponent from '../components/DirectoryComponent';
import SideBar from '../components/layout/SideBar';

function Home() {
  return (
    <Layout>
      <main className='wrapper-home'>
        <SideBar>
          <DirectoryComponent />
        </SideBar>
      </main>
    </Layout>
  );
};

export default Home;
