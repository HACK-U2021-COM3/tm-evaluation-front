import React from 'react';
import {
  Flex,
  HStack,
  Button,
  useToast
} from '@chakra-ui/react';
import SearchInputComponent from 'components/commons/forms/SearchInput';
import TitleInputComponent from 'components/commons/forms/TitleInput';
import NavMenuComponent from 'components/commons/objects/NavMenu';
import HeaderContainerComponent from 'components/commons/layouts/HeaderContainer';

const HomeLoginHeaderComponent: React.VFC = () =>  {
  const toast = useToast()
  return (
    <>
        <HeaderContainerComponent>
            <HStack spacing={12} alignItems={'center'}>
                <TitleInputComponent />
                <SearchInputComponent />
            </HStack>
            <Flex alignItems={'center'}>
                <Button
                colorScheme="blue"
                mx="5"
                onClick={() => toast({
                    title: "保存しました",
                    position: "top",
                    duration: 9000,
                    isClosable: true,
                })}
                >
                保存する
                </Button>
                <NavMenuComponent />
            </Flex>
        </HeaderContainerComponent>
    </>
  );
}

export default HomeLoginHeaderComponent;