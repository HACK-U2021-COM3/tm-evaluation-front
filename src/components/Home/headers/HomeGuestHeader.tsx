import React from 'react';
import { HStack, Image } from '@chakra-ui/react';
import SearchInput from 'components/commons/forms/SearchInput';
import HeaderContainerComponent from 'components/commons/layouts/HeaderContainer';
import { GoogleLogin } from 'react-google-login';
import { GoogleService } from 'lib/services/google/GoogleService';
import { useHistory } from 'react-router-dom';


const HomeGuestHeaderComponent: React.VFC<{
  searchQuery: string,
  handleSearch: (e: any) => void
}> = ({searchQuery, handleSearch}) =>  {
  const history = useHistory()
  const handleLogin = async (res: any) => {
    await (new GoogleService()).loginWithGoogle(res)
    console.log(res)
  }
  return (
    <>
        <HeaderContainerComponent>
            <HStack spacing={8} alignItems={'center'}>
                <Image src="/images/logo.png" w="50px" h="50px" />
                <SearchInput searchQuery={searchQuery} handleSearch={handleSearch} />
            </HStack>
            <HStack>
                <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                buttonText="ログイン"
                onSuccess={handleLogin}
                onFailure={(res) => console.error(res)}
                cookiePolicy={'single_host_origin'}
                />
            </HStack>

        </HeaderContainerComponent>
    </>
  );
}

export default HomeGuestHeaderComponent;