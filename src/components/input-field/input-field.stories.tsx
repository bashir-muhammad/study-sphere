import type { Meta, StoryObj } from "@storybook/nextjs";
import { InputField, TextArea, Label, FormField, Select } from "./input-field";

const inputFieldMeta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    placeholder: { control: "text" },
    value: { control: "text" },
  },
};

export default inputFieldMeta;
type InputFieldStory = StoryObj<typeof InputField>;

export const TextInput: InputFieldStory = {
  args: {
    placeholder: "Enter text here...",
    value: "",
  },
};

export const TextInputWithValue: InputFieldStory = {
  args: {
    placeholder: "Enter text here...",
    value: "Sample text",
  },
};

export const TextAreaDefault: InputFieldStory = {
  args: {
    placeholder: "Enter description here...",
    value: "",
  },
  render: ({ placeholder, value }) => (
    <TextArea placeholder={placeholder} value={value} />
  ),
};

export const LabelDefault: InputFieldStory = {
  render: () => <Label>Form Label</Label>,
};

export const FormFieldDefault: InputFieldStory = {
  args: {
    placeholder: "Enter text here...",
    value: "",
  },
  render: ({ placeholder, value }) => (
    <FormField id="input-field-default" label="Form Field Label">
      <InputField placeholder={placeholder} value={value} />
    </FormField>
  ),
};

export const FormFieldWithTextAreaDefault: InputFieldStory = {
  args: {
    placeholder: "Enter description here...",
    value: "",
  },
  render: ({ placeholder, value }) => (
    <FormField id="textarea-description" label="Description">
      <TextArea placeholder={placeholder} value={value} />
    </FormField>
  ),
};

export const SelectDefault: InputFieldStory = {
  args: {
    value: "",
  },
  render: ({ value }) => (
    <Select
      value={value}
      options={[
        { value: "science", label: "Science" },
        { value: "design", label: "Design" },
        { value: "history", label: "History" },
        { value: "languages", label: "Languages" },
      ]}
    />
  ),
};

export const FormFieldWithSelectDefault: InputFieldStory = {
  args: {
    value: "",
  },
  render: ({ value }) => (
    <FormField id="select-focus-domain" label="Focus Domain">
      <Select
        value={value}
        options={[
          { value: "science", label: "Science" },
          { value: "design", label: "Design" },
          { value: "history", label: "History" },
          { value: "languages", label: "Languages" },
        ]}
      />
    </FormField>
  ),
};
