import "./Profile.css";
import { useAuthValue } from "../../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Button, Heading, Stack, Box, Text, Badge } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  CheckCircleIcon,
  WarningIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";

function Profile() {
  const { currentUser } = useAuthValue();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center">
      <div className="profile">
        <Heading as={"h1"} marginBottom={"10px"}>
          Profile
        </Heading>
        <p>
          <strong>Email: </strong>
          {currentUser?.email} | <strong>Status: </strong>
          <Box display="inline-flex" textAlign="center">
            {currentUser?.emailVerified ? (
              <Stack direction="row">
                (<CheckCircleIcon color="green.500" />
                ), (<Badge colorScheme="green">Verified</Badge>)
              </Stack>
            ) : (
              <Stack direction="row">
                (<WarningIcon color="red.500" /> ), (
                <Badge colorScheme="red">Not Verified</Badge>)
              </Stack>
            )}
          </Box>
        </p>
        <hr />
        <Stack marginTop={3} spacing={3}>
          <Button colorScheme="blue" leftIcon={<ExternalLinkIcon />}>
            <Link to="https://x-notes-2.vercel.app/">xNotes V2 - External</Link>
          </Button>
          <Button colorScheme="blue" isDisabled>
            Coming Soon
          </Button>
          <Button colorScheme="blue" isDisabled>
            Coming Soon
          </Button>
          <hr />
          <Text color="white.500" fontSize="sm" fontWeight="bold">
            For Developer
          </Text>
          <Button colorScheme="purple" leftIcon={<ExternalLinkIcon />}>
            <Link to="https://overapi.com/css" target="_blank">
              CSS Cheat Sheet
            </Link>
          </Button>
          <Button colorScheme="purple" leftIcon={<ExternalLinkIcon />}>
            <Link to="https://smalldev.tools" target="_blank">
              SmallDev Tools
            </Link>
          </Button>
          <Button colorScheme="purple" leftIcon={<ExternalLinkIcon />}>
            <Link to="https://typescale.com" target="_blank">
              Visual Type Scale
            </Link>
          </Button>
          <hr />
          <Text color="white.500" fontSize="sm" fontWeight="bold">
            OR
          </Text>
          <Button colorScheme="red" onClick={handleSignOut} isLoading={loading}>
            Sign Out
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default Profile;
