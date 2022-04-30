import { Table, Tbody, Thead, Tr } from "@chakra-ui/react";

export const SubtitleTitle = () => {
  return (
    <Table>
      <Tr>
        <Thead>Subtitle</Thead>
        <Thead>In Time</Thead>
        <Thead>Out Time</Thead>
        <Thead>Actions</Thead>
      </Tr>

      <Tbody>
          {/* The subtitle stuff that will be mapped */}
      </Tbody>
    </Table>
  );
};
