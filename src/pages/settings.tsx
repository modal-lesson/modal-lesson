import { MainLayout } from "~/layout/MainLayout";

export default function Page() {
  return <div>Settings</div>;
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
