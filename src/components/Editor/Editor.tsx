import { Avatar } from '@/services/user/users.dto';
import { axiosClient } from '@/utils/axiosClient';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { FileLoader, UploadAdapter } from '@ckeditor/ckeditor5-upload';
import type { Editor as IEditor } from '@ckeditor/ckeditor5-core';
import { ChangeEvent, ChangeEventHandler } from 'react';

export type EditorProps = {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
};

function initPlugin(editor: IEditor) {
  editor.ui.view.editable.extendTemplate({
    attributes: {
      style: {
        minHeight: '200px',
      },
    },
  });
}

function uploadPlugin(editor: IEditor) {
  editor.plugins.get('FileRepository').createUploadAdapter = function (loader: FileLoader): UploadAdapter {
    return {
      upload: function () {
        return new Promise((resolve, reject) =>
          loader.file.then(async (file) => {
            if (file) {
              const body = new FormData();

              body.append('files', file);

              try {
                const { data } = await axiosClient.post<Avatar[]>('/upload', body, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                });

                resolve({ default: process.env.API_NEXT_PUBLIC_IMAGE_URL + data?.[0].url });
              } catch (error) {
                reject(error);
              }
            }
          }),
        );
      },
    };
  };
}

function Editor({ value, onChange, onBlur, ...props }: EditorProps) {
  return (
    <CKEditor
      {...props}
      config={{
        extraPlugins: [initPlugin, uploadPlugin],
      }}
      editor={ClassicEditor}
      data={value}
      onChange={(_, editor) => {
        if (onChange) {
          const data = editor.getData();
          onChange({
            target: {
              value: data,
            },
          } as ChangeEvent<HTMLInputElement>);
        }
      }}
      onBlur={(_, editor) => {
        if (onBlur) {
          const data = editor.getData();
          onBlur({
            target: {
              value: data,
            },
          } as ChangeEvent<HTMLInputElement>);
        }
      }}
    />
  );
}

export default Editor;
