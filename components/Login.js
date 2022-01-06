import { signIn } from "next-auth/react";
import Image from "next/image";

function Login({ providers }) {
  return (
    <div className="">
      <Image
        src="https://rb.gy/ogau5a"
        width={150}
        height={150}
        objectFit="contain"
      />

      {/* Converts them into an array so we can map them */}
      <div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            {/* https://devdojo.com/tailwindcss/buttons#_ */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;
