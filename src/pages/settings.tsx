import { MainLayout } from "~/layout/MainLayout";
import { getServerSideProps } from "~/server/serverProps";

export default function Page() {
  return <div>Settings</div>;
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export { getServerSideProps };
