import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Center, useColorModeValue, Icon, List, ListItem, ListIcon } from '@chakra-ui/react';
import { FiImage, FiFilePlus } from 'react-icons/fi';

export default function Dropzone({ onFileAccepted }) {
    const onDrop = useCallback((acceptedFile) => {
        onFileAccepted(acceptedFile[0]);
    }, [onFileAccepted]);

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop, accept: 'image/*', maxFiles: 3, multiple: true,
    });

    const dropText = isDragActive ? 'Drop the files here ...' : 'Drag \'n\' drop screenshot file here, or click to select files';

    const activeBg = useColorModeValue('gray.100', 'gray.600');
    const borderColor = useColorModeValue(
        isDragActive ? 'teal.300' : 'gray.300',
        isDragActive ? 'teal.500' : 'gray.500',
    );



    return (<>
        <Center
            p={10}
            cursor="pointer"
            bg={isDragActive ? activeBg : 'transparent'}
            _hover={{ bg: activeBg }}
            transition="background-color 0.2s ease"
            borderRadius={4}
            border="3px dashed"
            borderColor={borderColor}
            {...getRootProps()}
            mb='4'
        >
            <input {...getInputProps()} />
            <Icon as={FiFilePlus} mr={2} />
            <p>{dropText}</p>
        </Center>
        {/* list file names */}
        <List>
            {acceptedFiles.map((file) => (
                <ListItem key={file.path}>
                    <ListIcon as={FiImage} />
                    {file.path} - {file.size} bytes
                </ListItem>
            ))}
        </List>

    </>
    );
}