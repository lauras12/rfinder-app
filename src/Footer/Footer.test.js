import React from 'react';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import Footer from './Footer';


describe('Footer component', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDom.render(<Footer />, div);
        ReactDom.unmountComponentAtNode(div);
    });

    it('renders UI as expected', () => {
        const item = renderer.create(<Footer />);
        expect(item.toJSON()).toMatchSnapshot();
    })
})