import DefaultLayer from '../layouts/default-layer.tsx';
import { Box, Button, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FileUploader } from 'react-drag-drop-files';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { maxFileSizeUpload } from '../constants';
import EmployeeApi from "../api/employee.api.ts";


// Styled components
const Container = styled('div')`
  margin-top: 40px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PurpleSection = styled('div')`
  background: linear-gradient(135deg, #2F45AB, #7693F5);
  padding: 20px;
  width: 100%;
  text-align: center;
`;

const StyledButton = styled(Button)`
  background-color: #800080;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

const FileUploadContainer = styled('div')`
  background: linear-gradient(135deg, #DAC4FB, #B590E8);
  color: white;
  padding: 150px 20px;
  width: 60%;
  text-align: center;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`;

const fileTypes = ['CSV'];

const HomeDesktop: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (f: File) => {
    setFile(f);
  };

  const [submit, setSubmitted] = useState<boolean>(false);

  const handleFileUpload = async () => {
    try {
      if (file !== null) {
        const formData = new FormData();
        formData.append('csv', file);

        // Make the API call to upload the file
        const response = await EmployeeApi.create(formData);

        // Check if the response is successful
        if (response.status === 200) {
          console.log('File upload successful', response.data);
          toast.info('File uploaded successfully');
          setSubmitted(true);
        } else {
          console.error('File upload failed', response.data);
          toast.error('File upload failed');
        }
      } else {
        toast.warn('Please upload a file');
      }
    } catch (error) {
      console.error('An error occurred during file upload', error);
      toast.error('An error occurred during file upload');
    }
  };


  useEffect(() => {
    setFile(null);
  }, []);

  const backgroundImage = 'url("data:image/svg+xml,%3csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3crect width=\'100%25\' height=\'100%25\' fill=\'none\' rx=\'18\' ry=\'18\' stroke=\'%23000000FF\' stroke-width=\'4\' stroke-dasharray=\'6%2c 14\' stroke-dashoffset=\'0\' stroke-linecap=\'square\'/%3e%3c/svg%3e")';

  useEffect(() => {
    fetchData();
  }, [submit]);

  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      console.log(EmployeeApi.getAll());
      const response = await EmployeeApi.getAll(); // Adjust the URL as per your backend route
      setData(response?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log(data)

  const fileUploadStack = (
    <Box
      className='container'
      style={{ backgroundImage: backgroundImage,
        borderRadius: '18px',
        padding: '20%',
        cursor: 'pointer' }}
    >
      <Box style={{
        textAlign: 'center',
        color: 'white',
        fontSize: '36px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '60px'
      }}>
        <div>
          <img src={'/drop-and-drag.svg'} width='75' />
        </div>
      </Box>
      <Box style={{
        textAlign: 'center',
        color: 'white',
        fontSize: '36px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '10px'
      }}>
        <Typography sx={{ fontSize: 14 }} color={'black'} gutterBottom>
                    Drop ZIP file here {file?.name}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <DefaultLayer>
      <Container>
        <PurpleSection>
          <Typography variant='h1' sx={{
            color: 'white',
            margin: '44px 0 20px 0'
          }}>Upload you CSV format with employees</Typography>
          <StyledButton sx={{margin: '20px 0'}}>Get Started</StyledButton>
        </PurpleSection>

        <br/>
        <br/>
        <br/>
        <br/>

        <h1>Employee Data</h1>
        <ul>
          {data.map((item, index) => (
              <li key={index}>
                Worker ID: {item['workerId1']}, Worker ID: {item['workerId2']}, Common Projects: {item['daysWorked']}
                <br/>
              </li>
          ))}
        </ul>

        <br/>
        <br/>

        <FileUploadContainer sx={{gap: 2}}>
          <Typography variant='h3' color={'black'}>Drag and Drop Employees file in CSV format</Typography>
          <Stack direction='column' gap={5}>
            <FileUploader handleChange={handleChange} name='file' types={fileTypes} maxSize={maxFileSizeUpload}
                          children={fileUploadStack}/>
            <Button
                onClick={handleFileUpload}
                variant='contained'
                color='primary'
                style={{
                  width: '150px',
                  height: '45px',
                  fontWeight: 'normal',
                  alignSelf: 'center'
                }}
            >
              Upload file
            </Button>
          </Stack>
        </FileUploadContainer>
      </Container>
    </DefaultLayer>
  );
};

export default HomeDesktop;
