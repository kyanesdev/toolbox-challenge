import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from '../actions/fileActions';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

const FileTable = () => {
    const dispatch = useDispatch();
    const filesState = useSelector((state) => state.files);
    const { loading, files, error } = filesState;
    const [fileNameFilter, setFileNameFilter] = useState('');

    useEffect(() => {
        dispatch(fetchFiles(fileNameFilter));
    }, [dispatch, fileNameFilter]);

    const handleInputChange = (event) => {
        setFileNameFilter(event.target.value);
    };

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
        <h4>Insertar directo el nombre del archivo "nombre_archivo.csv" para el filtro</h4>
            <input
                type="text"
                value={fileNameFilter}
                onChange={handleInputChange}
                placeholder="Filter by fileName..."
            />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>File Name</th>
                        <th>Text</th>
                        <th>Number</th>
                        <th>Hex</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map(file =>
                        file.lines.map((line, index) => (
                            <tr key={`${file.file}-${index}`}>
                                <td>{file.file}</td>
                                <td>{line.text}</td>
                                <td>{line.number}</td>
                                <td>{line.hex}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default FileTable;
