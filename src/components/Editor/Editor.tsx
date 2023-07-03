import { useTheme } from 'next-themes';
import { SetStateAction } from 'react';
import rehypeSanitize from 'rehype-sanitize';
import { uploadImageAPI } from '@/services/media/media.service';
import MDEditor from '@uiw/react-md-editor';

export interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const onImagePasted = async (
  dataTransfer: DataTransfer,
  setMarkdown: (value: SetStateAction<string | undefined>) => void,
) => {
  const files: File[] = [];
  for (let index = 0; index < dataTransfer.items.length; index += 1) {
    const file = dataTransfer.files.item(index);

    if (file) {
      files.push(file);
    }
  }

  await Promise.all(
    files.map(async (file) => {
      const data = await uploadImageAPI(file);

      const insertedMarkdown = insertToTextArea(`![](${data?.[0].url})`);
      if (!insertedMarkdown) {
        return;
      }
      setMarkdown(insertedMarkdown);
    }),
  );
};

const insertToTextArea = (intsertString: string) => {
  const textarea = document.querySelector('textarea');
  if (!textarea) {
    return null;
  }

  let sentence = textarea.value;
  const len = sentence.length;
  const pos = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const front = sentence.slice(0, pos);
  const back = sentence.slice(pos, len);

  sentence = front + intsertString + back;

  textarea.value = sentence;
  textarea.selectionEnd = end + intsertString.length;

  return sentence;
};

export default function Editor({ value, onChange }: EditorProps) {
  const { theme } = useTheme();

  return (
    <div data-color-mode={theme}>
      <MDEditor
        value={value}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        preview="edit"
        onChange={onChange}
        onPaste={async (event) => {
          await onImagePasted(event.clipboardData, onChange);
        }}
        onDrop={async (event) => {
          await onImagePasted(event.dataTransfer, onChange);
        }}
      />
    </div>
  );
}
