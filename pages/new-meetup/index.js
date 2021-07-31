import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetup = () => {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetup) {
    try {
      const response = await fetch("/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(enteredMeetup),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error(err);
    }
    router.replace("/");
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetup;
