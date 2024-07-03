import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';

const mockStore = configureStore([]);

describe('App Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            files: {
                fileList: ["test1.csv", "test2.csv"],
                fileData: [
                    {
                        file: 'test1.csv',
                        lines: [
                            { text: 'Line 1', number: 1, hex: '123abc' },
                            { text: 'Line 2', number: 2, hex: '456def' }
                        ]
                    },
                    {
                        file: 'test2.csv',
                        lines: [
                            { text: 'Line 3', number: 3, hex: '789ghi' },
                            { text: 'Line 4', number: 4, hex: 'abcjkl' }
                        ]
                    }
                ],
                loading: false,
                error: null
            }
        });
    });

    test('renders App component', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        expect(screen.getByText('Toolbox Frontend Challenge')).toBeInTheDocument();
    });

    test('displays FileTable component with headers', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        expect(screen.getByText('File Name')).toBeInTheDocument();
        expect(screen.getByText('Text')).toBeInTheDocument();
        expect(screen.getByText('Number')).toBeInTheDocument();
        expect(screen.getByText('Hex')).toBeInTheDocument();
    });

    test('displays data in FileTable component', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        expect(screen.getByText('test1.csv')).toBeInTheDocument();
        expect(screen.getByText('Line 1')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('123abc')).toBeInTheDocument();

        expect(screen.getByText('test2.csv')).toBeInTheDocument();
        expect(screen.getByText('Line 3')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('789ghi')).toBeInTheDocument();
    });
});
