import "./Profile.css";
import { useAuthValue } from "../../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Button, Heading, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Profile() {
  const { currentUser } = useAuthValue();

  return (
    <div className="center">
      <div className="profile">
        <Heading as={"h1"} marginBottom={"10px"}>
          Profile
        </Heading>
        <p>
          <strong>Email: </strong>
          {currentUser?.email}
        </p>
        <p>
          <strong>Verified: </strong>
          {`${currentUser?.emailVerified}`}
        </p>
        <hr />
        <Stack marginTop={"10px"} marginBottom={"10px"}>
          <Button colorScheme="blue">
            <Link to="/xnotes">xNotes - Internal</Link>
          </Button>
          <Button colorScheme="blue">
            <Link to="https://x-notes-2.vercel.app/">xNotes V2 - External</Link>
          </Button>
          <Button colorScheme="blue">Coming Soon</Button>
          <Button colorScheme="blue">Coming Soon</Button>
          <hr />
          <Button colorScheme="red" onClick={() => signOut(auth)}>
            Sign Out
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default Profile;
