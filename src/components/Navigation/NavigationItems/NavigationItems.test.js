import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItem from './NavigationItem/NavigationItem';
import NavigationItems from './NavigationItems';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })
    it('should render TWO <NavigationItem /> elements if NOT Authenticated', () => {
        // const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })

    it('should render THREE <NavigationItem /> elements if Authenticated', () => {
        // const wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({ isAuthenticated: true })
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })
})