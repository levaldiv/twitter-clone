import { signIn } from "next-auth/react";
import Image from "next/image";

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center space-y-20 pt-48">
      <Image
        src="https://rb.gy/ogau5a"
        width={150}
        height={150}
        objectFit="contain" />

      {/* Converts them into an array so we can map them */}
      <div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            {/* https://devdojo.com/tailwindcss/buttons#_ */}

            <button className="loginBtn group"
              // after a successful login, where do i wan to be redirected to?
              onClick={() => signIn(provider.id, { callbackUrl: "/" })} >
              
              <span className="btnTransition group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>

              <span className="txtTransition group-hover:text-white">
                Sign in with {provider.name}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;
