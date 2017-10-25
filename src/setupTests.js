import 'jest-enzyme'

global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
