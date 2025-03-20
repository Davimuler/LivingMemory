import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const ImageUploader = () => {
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState(null);

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setImageUrl(response.data.fileUrl);
        } catch (err) {
            setError('Ошибка загрузки файла. Пожалуйста, попробуйте снова.');
        } finally {
            setUploading(false);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 1,
    });

    return (
        <div>
            <div {...getRootProps()} style={dropzoneStyle}>
                <input {...getInputProps()} />
                {uploading ? (
                    <p>Загрузка...</p>
                ) : (
                    <p>Перетащите сюда изображение или кликните для выбора файла</p>
                )}
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {imageUrl && (
                <div>
                    <h3>Загруженное изображение:</h3>
                    <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
            )}
        </div>
    );
};

const dropzoneStyle = {
    border: '2px dashed #007bff',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '20px',
};

export default ImageUploader;