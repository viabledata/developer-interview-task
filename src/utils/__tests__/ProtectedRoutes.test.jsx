import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoutes';

describe('Routing tests', () => {
  const TestComponent = () => <div>test text</div>;

  it('should render the page if the user is permitted to view', () => {
    const isPermittedToView = true;
    render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route element={<ProtectedRoute isPermittedToView={isPermittedToView} />}>
            <Route path="/test" element={<TestComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByText('test text')).toBeInTheDocument();
  });

  it('should NOT render the page if the user is NOT permitted to view', () => {
    const isPermittedToView = false;
    render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route element={<ProtectedRoute isPermittedToView={isPermittedToView} />}>
            <Route path="/test" element={<TestComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByText('test text')).not.toBeInTheDocument();
  });
});
