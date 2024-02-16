import {
  chakra,
  HTMLChakraProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export const Logo: React.FC<HTMLChakraProps<"svg">> = (props) => {
  const color = useColorModeValue("#231f20", "#fff");
  return (
    <chakra.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 550 172"
      {...props}
    >
      <path
        fill="#12212b"
        d="
  M 130.99 138.58
  L 130.96 123.93
  A 0.41 0.41 0.0 0 1 131.37 123.52
  L 145.97 123.52
  A 0.41 0.41 0.0 0 1 146.38 123.93
  L 146.26 154.32
  A 0.41 0.41 0.0 0 1 145.85 154.73
  L 16.94 154.79
  A 0.41 0.41 0.0 0 1 16.53 154.38
  L 16.49 5.20
  A 0.41 0.41 0.0 0 1 16.90 4.79
  L 146.02 4.72
  A 0.41 0.41 0.0 0 1 146.43 5.13
  L 146.34 20.63
  A 0.41 0.41 0.0 0 1 145.93 21.04
  L 32.63 21.01
  A 0.41 0.41 0.0 0 0 32.22 21.42
  L 32.28 71.28
  A 0.41 0.41 0.0 0 0 32.69 71.69
  L 146.01 71.70
  A 0.41 0.41 0.0 0 1 146.42 72.11
  L 146.26 87.11
  A 0.41 0.41 0.0 0 1 145.85 87.52
  L 32.65 87.51
  A 0.41 0.41 0.0 0 0 32.24 87.92
  L 32.21 138.58
  A 0.41 0.41 0.0 0 0 32.62 138.99
  L 130.58 138.99
  A 0.41 0.41 0.0 0 0 130.99 138.58
  Z"
      />
      <text
        // transform="rotate(-30deg)" // Rotated to follow path curve
        x="400" // Adjusted horizontally for better fit
        y="140" // Adjusted vertically for better visibility
        font-size="100" // Increased font size
        font-family="sans-serif"
      >
        <tspan x="180">t</tspan>
        <tspan x="210">e</tspan>
        <tspan x="270">r</tspan>
        <tspan x="310">n</tspan>
        <tspan x="370">i</tspan>
        <tspan x="400" font-weight="normal">
          a
        </tspan>
        <tspan x="170"> </tspan>
        {/* <tspan x="180" font-weight="normal">
          s
        </tspan>
        <tspan x="210" font-weight="normal">
          o
        </tspan>
        <tspan x="240" font-weight="normal">
          f
        </tspan>
        <tspan x="270" font-weight="normal">
          t
        </tspan> */}
      </text>
    </chakra.svg>
  );
};

// export const Logo: React.FC<HTMLChakraProps<"svg">> = (props) => {
//   return (
//     <Link href="/">
//       <Image
//         src="/images/logo/eterniasoftlogo.svg"
//         alt="logo"
//         width={119.03}
//         height={30}
//         className="hidden w-full dark:block"
//       />
//     </Link>
//   );
// };
