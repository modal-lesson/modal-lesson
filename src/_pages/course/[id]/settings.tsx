import { MainLayout } from "~/layout/MainLayout";
import { getServerSideProps } from "~/server/serverProps";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group } from "@mantine/core";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const deleteMutation = api.course.delete.useMutation({
    onSettled: async () => {
      await router.push("/home");
    },
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Course deleted successfully",
        color: "green",
      });
    },
  });

  return (
    <div>
      <h2>Settings</h2>
      <DeleteModal deleteMutation={deleteMutation} courseId={id as string} />
    </div>
  );
}

function DeleteModal({
  deleteMutation,
  courseId,
}: {
  deleteMutation: ReturnType<typeof api.course.delete.useMutation>;
  courseId: string;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Confirmation">
        <p>Are you sure you want to delete this course?</p>
        <div className="mt-10 flex gap-3">
          <Button variant="white" onClick={close}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteMutation.mutate({ courseId });
              close();
            }}
            color="red"
          >
            Confirm
          </Button>
        </div>
      </Modal>

      <Group position="center">
        <Button
          className="w-full !bg-primary text-white text-sm font-bold px-4 py-3 rounded-md hover:!bg-primary-hover"
          onClick={open}
        >
          Delete Course
        </Button>
      </Group>
    </>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export { getServerSideProps };
