import { useEffect, useRef, useState } from 'react';

interface GoogleAuthProviderProps {
    // google oauth client id
    clientId?: string;
    // google scopes
    scope?: string;
    // on sign in callback
    onSignInSuccess?: (response: GoogleSignInResponse) => void;
}

export interface GoogleSignInResponse {
    tokenObj: gapi.auth2.AuthResponse;
    user: gapi.auth2.GoogleUser;
}

/**
 * Hook to use the google authentication
 * @returns authenticating state variable and signIn and signOut functions
 */
export const useGoogleAuthProvider = ({
    clientId = process.env.REACT_APP_OAUTH_CLIENT_ID!,
    scope,
    onSignInSuccess = () => {}
}: GoogleAuthProviderProps = {}) => {
    const [authenticating, setAuthenticating] = useState(true);
    const auth = useRef<gapi.auth2.GoogleAuth | null>(null);

    useEffect(() => {
        gapi.load('client:auth2', async () => {
            if (!gapi.auth2.getAuthInstance()) {
                await gapi.client.init({
                    clientId,
                    scope: 'email'
                });
            }

            auth.current = gapi.auth2.getAuthInstance();
            const signedIn = auth.current.isSignedIn.get();

            if (signedIn) {
                onSignInSuccess({
                    user: auth.current?.currentUser.get()!,
                    tokenObj: auth.current?.currentUser.get().getAuthResponse()!
                });
            }
            setAuthenticating(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientId, scope]);

    const signIn = async (): Promise<GoogleSignInResponse> => {
        try {
            await auth.current?.signIn();
        } catch (error) {
            Promise.reject(error);
        }

        const result = {
            user: auth.current?.currentUser.get()!,
            tokenObj: auth.current?.currentUser.get().getAuthResponse()!
        };

        onSignInSuccess(result);

        return result;
    };

    const signOut = async () => {
        return auth.current?.signOut();
    };

    return {
        authenticating,
        signIn,
        signOut
    };
};
