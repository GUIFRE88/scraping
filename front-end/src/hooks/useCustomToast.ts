import { useToast } from "@chakra-ui/react"

export const useCustomToast = () => {
  const toast = useToast()

  const showToast = (title: string, description: string, status: "success" | "error") => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: 'bottom-right',
    });
  };

  return showToast
}
