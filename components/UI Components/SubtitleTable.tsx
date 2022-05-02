import { Box, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

export const SubtitleTable = (props) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Subtitle</Th>

          <Th>In Time</Th>

          <Th>Out Time</Th>

          <Th>Actions</Th>
        </Tr>
      </Thead>

      <Tbody>
        {/* // **** Add new Rows from Props */}
        {props.children}
      </Tbody>
    </Table>
  );
};
