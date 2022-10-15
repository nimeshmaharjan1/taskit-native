import React from "react";
import {
  Center,
  Box,
  Button,
  Text,
  Heading,
  VStack,
  Input,
  HStack,
  Divider,
  ScrollView,
  Checkbox,
  IconButton,
  Icon,
  Pressable,
  useToast,
} from "native-base";
import Layout from "../components/Layout";
import uuid from "react-native-uuid";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  removeTask,
  selectTasks,
  toggleIsDone,
} from "../store/slices/tasks";
import { AppDispatch } from "../store";

import { Feather } from "@expo/vector-icons";

export interface Task {
  id: any;
  body: string;
  isDone: boolean;
}

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector(selectTasks);
  const add = (task: Task) => {
    dispatch(addTask(task));
    toast.show({
      render: () => (
        <Box
          bg="emerald.500"
          p="2"
          mr="4"
          rounded="sm"
          mb={5}
          _text={{ color: "white" }}
        >
          <HStack alignItems="center">
            <IconButton
              colorScheme={"white"}
              icon={<Icon as={Feather} name="check" color={"white"}></Icon>}
            ></IconButton>
            <Text pr="4" color={"white"}>
              Task has been added!
            </Text>
          </HStack>
        </Box>
      ),
    });
  };
  const [body, setBody] = React.useState("");
  const toast = useToast();
  return (
    <Layout>
      <Heading color="white" size="2xl">
        Taskit
      </Heading>
      <ScrollView py={2}>
        <VStack space={4} my="3">
          <HStack space={3} justifyContent="space-around">
            <Input
              fontSize={18}
              color={"white"}
              w={"64"}
              placeholder="Enter task here..."
              variant={"underlined"}
              onChangeText={setBody}
            ></Input>
            <Button
              w={"16"}
              onPress={() =>
                add({
                  id: uuid.v4(),
                  body,
                  isDone: false,
                })
              }
            >
              Add
            </Button>
          </HStack>
          <Box
            bg={"muted.700"}
            rounded="md"
            p={2}
            mt={2}
            _text={{ color: "white" }}
          >
            {tasks.length === 0 ? (
              <Text color="white" p={2}>
                No tasks have been registered yet!
              </Text>
            ) : (
              tasks.map((task: Task, index: number) => (
                <Box pb={tasks.length > 1 ? 5 : null} key={task.id}>
                  <HStack
                    space={3}
                    alignItems="center"
                    justifyContent={"space-between"}
                    p={2}
                  >
                    <HStack space={3} alignItems="center">
                      <Checkbox
                        size={"lg"}
                        isChecked={task.isDone}
                        value="is done"
                        accessibilityLabel="This is a dummy checkbox"
                        onChange={() => dispatch(toggleIsDone(task.id))}
                      />
                      <Text
                        color="white"
                        fontSize={18}
                        style={
                          task.isDone
                            ? {
                                textDecorationLine: "line-through",
                                color: "gray",
                              }
                            : null
                        }
                      >
                        {task.body}
                      </Text>
                    </HStack>
                    <IconButton
                      onPress={() => {
                        dispatch(removeTask(task.id));
                        toast.show({
                          render: () => (
                            <Box
                              bg="red.500"
                              p="2"
                              mr="4"
                              rounded="sm"
                              mb={5}
                              _text={{ color: "white" }}
                            >
                              <HStack space={2} alignItems="center">
                                <IconButton
                                  colorScheme={"white"}
                                  icon={
                                    <Icon
                                      as={Feather}
                                      name="trash"
                                      color={"white"}
                                    ></Icon>
                                  }
                                ></IconButton>
                                <Text pr="4" color={"white"}>
                                  Task deleted!
                                </Text>
                              </HStack>
                            </Box>
                          ),
                        });
                      }}
                      colorScheme={"red"}
                      icon={<Icon as={Feather} name="trash"></Icon>}
                    ></IconButton>
                  </HStack>
                  {tasks.length > 1 && <Divider></Divider>}
                </Box>
              ))
            )}
          </Box>
        </VStack>
      </ScrollView>
    </Layout>
  );
};

export default Home;
