import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const ExcelUploadButton = ({ onUploadSuccess }: any) => {
  const [uploading, setUploading] = useState(false);

  // Overwrite AntD to use Axios
  const customRequest = async (options) => {
    const { file, onSuccess, onError } = options;
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/api/product/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      message.success(`${file.name} importado correctamente.`);
      onSuccess(response.data);
      onUploadSuccess()
    } catch (error) {
      console.error(error);
      //this could use some more detailed error handling, but it is alright for now
      message.error(`Falló la importación de ${file.name}.`);
      onError(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Upload
      customRequest={customRequest}
      showUploadList={false}
      accept=".xlsx, .xls"
    >
      <Button icon={<UploadOutlined />} loading={uploading} type="primary">
        Importar Excel
      </Button>
    </Upload>
  );
};
export default ExcelUploadButton;