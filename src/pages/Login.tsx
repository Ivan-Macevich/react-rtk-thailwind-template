import brand from "../assets/brand.svg";
import { useGoogleLogin } from "@react-oauth/google";
import { useSignUpWithGoogleMutation } from "../modules/auth/authApi";
import { onGoogleSignUp, TokensDto } from "../modules/auth";
import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../constants";

export function Login() {
  const [signUp] = useSignUpWithGoogleMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const signUpWithGoogle = useGoogleLogin({
    onSuccess: (response) => {
      signUp({ token: response.access_token })
        .unwrap()
        .then(handleGoogleAuth)
        .catch((err) => {
          setError(err.data?.message);
        });
    },
    onError: (error) => console.log(error),
  });

  const handleGoogleAuth = async (tokens: TokensDto) => {
    await dispatch(onGoogleSignUp(tokens)).unwrap();
    navigate(AppRoute.Pitches);
  };

  return (
    <div className="mx-auto flex h-screen min-h-full flex-1 bg-white">
      <div className="mx-auto flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img className="h-10 w-auto invert" src={brand} alt="Indieline" />
            <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10">
            <div className="mt-10">
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => signUpWithGoogle()}
                  className="dark:focus:ring-[#4285F4]/55 mb-2 mr-2 inline-flex items-center self-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50"
                >
                  <svg
                    className="-ml-1 mr-2 h-4 w-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  Sign in with Google
                </button>

                <div className="m-auto text-center">{error}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
