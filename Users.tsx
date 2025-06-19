import { Heading, Box, Divider } from "@chakra-ui/react";

const Users = () => {
	return (
		<Box p={4} maxW="1200px" mx="auto">
			<Heading
				as="h1"
				size="2xl"
				mb={6}
				mt={12}
				textAlign="left"
				color="gray.700"
			>
				Users
			</Heading>
			<Divider borderColor="gray.400" />
		</Box>
	);
};

export default Users;

