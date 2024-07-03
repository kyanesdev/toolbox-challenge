import React from 'react';
import FileTable from './components/FileTable';
import Container from 'react-bootstrap/Container';

const App = () => {
    return (
        <Container>
            <h1 className="my-4">Toolbox Frontend Challenge</h1>
            <FileTable />
        </Container>
    );
};

export default App;
