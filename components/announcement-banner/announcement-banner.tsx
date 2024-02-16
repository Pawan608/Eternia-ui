// import NextLink from "next/link";
// import {
//   Box,
//   Container,
//   Flex,
//   HStack,
//   Icon,
//   Input,
//   InputGroup,
//   InputLeftElement,
//   LinkBox,
//   LinkOverlay,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import {
//   Banner,
//   BannerActions,
//   BannerContent,
//   BannerDescription,
//   BannerTitle,
//   Button,
// } from "@saas-ui/react";
// import { FiArrowRight } from "react-icons/fi";
// import { FaMicrophone } from "react-icons/fa";
// import React, { useState } from "react";
// import { useSearchStore } from "data/store";

// export interface AnnouncementBannerProps {
//   title: string;
//   description: string;
//   href: string;
// }

// export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = (
//   props
// ) => {
//   const { title, description, href } = props;
//   const bg = useColorModeValue("white", "gray.900");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isMicActive, setIsMicActive] = useState(false);
//   const { setSearchedText } = useSearchStore();

//   const inputRef = React.useRef<HTMLInputElement>(null);
//   const observerRef = React.useRef<MutationObserver>();

//   React.useEffect(() => {
//     observerRef.current = new MutationObserver(() => {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => {
//         setSearchedText(searchQuery);
//       }, 2000);
//     });

//     if (inputRef.current) {
//       observerRef.current.observe(inputRef.current, {
//         childList: true,
//         subtree: true,
//         characterData: true,
//         attributes: true,
//       });
//     }

//     return () => {
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }
//     };
//   }, [searchQuery]);

//   let timeout: NodeJS.Timeout;

//   const handleSpeechRecognition = () => {
//     const recognition = new (window as any).webkitSpeechRecognition();
//     // recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.onstart = () => {
//       setIsMicActive(true);
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setSearchQuery(transcript);
//     };

//     recognition.onend = () => {
//       setIsMicActive(false);
//       setTimeout(() => {
//         recognition.stop();
//         // setSearchTextDebounced(searchQuery);
//         setSearchedText(searchQuery);
//       }, 1000);
//     };

//     recognition.start();
//   };

//   if (!title) {
//     return null;
//   }

//   return (
//     <Flex position="absolute" top="100px" width="100%">
//       <Container maxW="container.2xl" maxH="80px" minH="20px" px="0">
//         <Banner
//           as={LinkBox}
//           display="flex"
//           bg={bg}
//           fontSize="sm"
//           justifyContent="center"
//           colorScheme="purple"
//           backgroundClip="padding-box"
//           borderRadius="full"
//           maxW="800px"
//           margin="0 auto"
//           borderWidth="2px"
//           borderTopWidth="0"
//           borderColor="transparent"
//           position="relative"
//           // py="4px"
//           // px="3"
//           overflow="visible"
//           cursor="pointer"
//           _before={{
//             content: `""`,
//             position: "absolute",
//             zIndex: -1,
//             top: 0,
//             right: 0,
//             bottom: 0,
//             left: 0,
//             borderRadius: "inherit",
//             margin: "-2px",
//             bgGradient: "linear(to-r, purple.500, cyan.500)",
//             p: "0",
//           }}
//           _hover={{
//             "& .chakra-icon": {
//               transform: "translate(0)",
//             },
//           }}
//         >
//           <HStack zIndex="2" w="100%">
//             <InputGroup w="100%" h="100%">
//               <Input
//                 ref={inputRef}
//                 type="search"
//                 placeholder="How can we help you?"
//                 fontSize="sm"
//                 borderRadius="full"
//                 border="none"
//                 _focus={{
//                   border: "none",
//                   boxShadow: "none",
//                 }}
//                 value={searchQuery}
//                 onChange={(e) => {
//                   setSearchQuery(e.target.value);
//                 }}
//               />
//               <InputLeftElement
//                 pointerEvents="auto"
//                 cursor="pointer"
//                 onClick={handleSpeechRecognition}
//               >
//                 <Icon
//                   as={FaMicrophone}
//                   color={isMicActive ? "red.500" : "gray.500"}
//                 />
//               </InputLeftElement>
//             </InputGroup>
//           </HStack>
//         </Banner>
//       </Container>
//     </Flex>
//   );
// };
import NextLink from "next/link";
import "./animation.module.css";
import {
  Box,
  Container,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Banner,
  BannerActions,
  BannerContent,
  BannerDescription,
  BannerTitle,
  Button,
} from "@saas-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { FaMicrophone } from "react-icons/fa";
import React, { useState, useRef } from "react";
import { useSearchStore } from "data/store";

export interface AnnouncementBannerProps {
  title: string;
  description: string;
  href: string;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = (
  props
) => {
  const { title, description, href } = props;
  const bg = useColorModeValue("white", "gray.900");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMicActive, setIsMicActive] = useState(false);
  const { setSearchedText } = useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const lastInputTimeRef = useRef<number | null>(null); // Timestamp of last input event
  let timeout: NodeJS.Timeout | null = null; // Timeout variable

  const pauseDelay = 2000; // 2 seconds pause duration

  const handleInputChange = (text: string) => {
    const currentTime = Date.now();
    lastInputTimeRef.current = currentTime;

    clearTimeout(timeout!); // Clear the previous timeout

    timeout = setTimeout(() => {
      // Check if the current input event is the last one after the pause duration
      if (currentTime === lastInputTimeRef.current) {
        setSearchedText(text);
      }
    }, pauseDelay);
  };

  const handleSpeechRecognition = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.onstart = () => {
      setIsMicActive(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      // handleInputChange(transcript); // Call handleInputChange to trigger action
    };

    recognition.onend = () => {
      setIsMicActive(false);
      setSearchedText(searchQuery);
      // clearTimeout(timeout!);
      // console.log("Searched text----", searchQuery);
      // Clear the timeout
    };

    recognition.start();
  };

  if (!title) {
    return null;
  }

  return (
    <Flex position="absolute" top="100px" width="100%">
      <Container maxW="container.2xl" maxH="80px" minH="20px" px="0">
        <Banner
          as={LinkBox}
          display="flex"
          bg={bg}
          fontSize="sm"
          justifyContent="center"
          colorScheme="purple"
          backgroundClip="padding-box"
          borderRadius="full"
          maxW="800px"
          margin="0 auto"
          borderWidth="2px"
          borderTopWidth="0"
          borderColor="transparent"
          position="relative"
          overflow="visible"
          cursor="pointer"
          _before={{
            content: `""`,
            position: "absolute",
            zIndex: -1,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            borderRadius: "inherit",
            margin: "-2px",
            bgGradient: "linear(to-r, purple.500, cyan.500)",
            p: "0",
          }}
          _hover={{
            "& .chakra-icon": {
              transform: "translate(0)",
            },
          }}
        >
          <HStack zIndex="2" w="100%">
            <InputGroup w="100%" h="100%">
              <Input
                ref={inputRef}
                type="search"
                placeholder="How can we help you?"
                fontSize="sm"
                borderRadius="full"
                border="none"
                _focus={{
                  border: "none",
                  boxShadow: "none",
                }}
                value={searchQuery}
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  setSearchQuery(target.value);
                  handleInputChange(target.value); // Call handleInputChange on input change
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search_input"
              />
              <InputLeftElement
                pointerEvents="auto"
                cursor="pointer"
                onClick={handleSpeechRecognition}
              >
                <Icon
                  as={FaMicrophone}
                  color={isMicActive ? "red.500" : "gray.500"}
                />
              </InputLeftElement>
            </InputGroup>
          </HStack>
        </Banner>
      </Container>
    </Flex>
  );
};
