import React from 'react';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import Finds from './Finds';


describe('Finds component', () => {
    const props = {
        checkedFinds: ['find1', 'find2']
    }

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDom.render(<Finds  {...props}/>, div);
        ReactDom.unmountComponentAtNode(div);
    });

    it('renders UI as expected', () => {
        const item = renderer.create(<Finds {...props}/>);
        expect(item.toJSON()).toMatchSnapshot();
    })
})