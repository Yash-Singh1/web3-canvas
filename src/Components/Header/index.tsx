import React, { FC, useState } from 'react';
import Avatar from './Avatar';
import { Box, Text } from '@blockstack/ui';
import { getPerson, getUserData, userSession } from '../../auth';
import { Redirect } from 'react-router-dom';

const Header: FC = function Header() {
  const [navigateToRoot, goToRoot] = useState<boolean>(false);

  if (navigateToRoot) {
    return <Redirect to="/" />;
  }
  if (!userSession.isUserSignedIn()) return null;

  let person = getPerson();
  let avatar = person.avatarUrl();

  return (
    <>
      {userSession.isUserSignedIn() ? (
        <Box>
          {avatar && <Avatar avatar={avatar} />}
          <Text fontWeight="500">{getUserData().username}</Text>
          <Text
            fontWeight="300"
            display="inline-block"
            ml={5}
            mt={5}
            color="ink.400"
            cursor="pointer"
            onClick={() => {
              userSession.signUserOut();
              goToRoot(true);
            }}
          >
            Sign out
          </Text>
        </Box>
      ) : null}
    </>
  );
}

export default Header;
