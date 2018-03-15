import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;
global.$ = () => ({
  slider: jest.fn(),
  parallax: jest.fn(),
  sideNav: jest.fn(),
  tabs: jest.fn(),
  collapsible: jest.fn(),
  materialbox: jest.fn(),
});
