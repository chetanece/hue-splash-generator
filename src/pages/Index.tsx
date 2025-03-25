
import { useState } from "react";
import {
  Box,
  Container,
  TextInput,
  Title,
  Text,
  ColorInput,
  Group,
  Button,
  Stack,
  Textarea,
  CopyButton,
  Paper,
  Divider,
} from "@mantine/core";

const Index = () => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#7289DA"); // Discord's default blue color
  const [outputText, setOutputText] = useState("");

  // Function to generate Discord colored text
  const generateColoredText = () => {
    if (!text) return;
    
    // Convert hex to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 0, g: 0, b: 0 };
    };

    const rgb = hexToRgb(color);
    // Discord format: ```diff\n+ [RGB(r,g,b)] Text goes here```
    const formattedText = `\`\`\`diff\n+ [RGB(${rgb.r},${rgb.g},${rgb.b})] ${text}\`\`\``;
    setOutputText(formattedText);
  };

  return (
    <Box className="min-h-screen py-10 bg-gray-50">
      <Container size="sm">
        <Stack spacing="lg">
          <Title order={1} align="center" color={color}>
            Discord Colored Text Generator
          </Title>
          
          <Text align="center" size="md" color="dimmed">
            Generate custom colored text to use in your Discord messages
          </Text>

          <Paper p="md" withBorder shadow="sm" radius="md">
            <Stack spacing="md">
              <TextInput
                label="Your Text"
                placeholder="Enter your text here"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />

              <ColorInput
                label="Select Color"
                format="hex"
                value={color}
                onChange={setColor}
                swatches={[
                  "#7289DA", // Discord Blurple
                  "#FF4500", // Discord Red
                  "#43B581", // Discord Green
                  "#FAA61A", // Discord Yellow
                  "#ffffff", // White
                  "#000000", // Black
                ]}
              />

              <Button
                onClick={generateColoredText}
                color={color}
                disabled={!text}
                fullWidth
              >
                Generate Colored Text
              </Button>
            </Stack>
          </Paper>

          {outputText && (
            <Paper p="md" withBorder shadow="sm" radius="md">
              <Stack spacing="md">
                <Group position="apart">
                  <Text weight={600}>Result:</Text>
                  <CopyButton value={outputText}>
                    {({ copied, copy }) => (
                      <Button
                        color={copied ? "teal" : "blue"}
                        onClick={copy}
                        size="xs"
                        variant="light"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                    )}
                  </CopyButton>
                </Group>
                
                <Divider />
                
                <Textarea
                  value={outputText}
                  readOnly
                  autosize
                  minRows={3}
                />
                
                <Text size="sm" color="dimmed">
                  Paste this text in Discord to see the colored text
                </Text>
              </Stack>
            </Paper>
          )}
          
          <Paper p="md" withBorder shadow="sm" radius="md">
            <Stack spacing="xs">
              <Text weight={600}>How to use:</Text>
              <Text size="sm">1. Enter your text and choose a color</Text>
              <Text size="sm">2. Click "Generate Colored Text"</Text>
              <Text size="sm">3. Copy the generated text</Text>
              <Text size="sm">4. Paste it in a Discord message and send</Text>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default Index;
