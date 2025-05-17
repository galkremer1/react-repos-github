const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const { Pagination } = require('../../../components/common/Pagination');

describe('Pagination Component', () => {
  const mockPageChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders page numbers correctly', () => {
    render(
      <Pagination 
        currentPage={1} 
        totalPages={5} 
        onPageChange={mockPageChange} 
      />
    );
    
    // Check all page numbers are rendered
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('marks current page as active', () => {
    render(
      <Pagination 
        currentPage={3} 
        totalPages={5} 
        onPageChange={mockPageChange} 
      />
    );
    
    // Current page should have the "current" class
    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toHaveClass('pagination__button--current');
    
    // Other pages should not have the "current" class
    const otherPageButton = screen.getByText('2');
    expect(otherPageButton).not.toHaveClass('pagination__button--current');
  });

  it('calls onPageChange when a page is clicked', () => {
    render(
      <Pagination 
        currentPage={1} 
        totalPages={5} 
        onPageChange={mockPageChange} 
      />
    );
    
    // Click on page 3
    fireEvent.click(screen.getByText('3'));
    
    // Check callback is called with correct page number
    expect(mockPageChange).toHaveBeenCalledTimes(1);
    expect(mockPageChange).toHaveBeenCalledWith(3);
  });

  it('disables Previous button on first page', () => {
    render(
      <Pagination 
        currentPage={1} 
        totalPages={5} 
        onPageChange={mockPageChange} 
      />
    );
    
    // Previous button should be disabled
    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeDisabled();
    
    // Next button should be enabled
    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).not.toBeDisabled();
  });

  it('disables Next button on last page', () => {
    render(
      <Pagination 
        currentPage={5} 
        totalPages={5} 
        onPageChange={mockPageChange} 
      />
    );
    
    // Next button should be disabled
    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeDisabled();
    
    // Previous button should be enabled
    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).not.toBeDisabled();
  });

  it('navigates to previous page when Previous is clicked', () => {
    render(
      <Pagination 
        currentPage={3} 
        totalPages={5} 
        onPageChange={mockPageChange} 
      />
    );
    
    // Click on Previous button
    fireEvent.click(screen.getByLabelText('Previous page'));
    
    // Check callback is called with previous page
    expect(mockPageChange).toHaveBeenCalledTimes(1);
    expect(mockPageChange).toHaveBeenCalledWith(2);
  });

  it('navigates to next page when Next is clicked', () => {
    render(
      <Pagination 
        currentPage={3} 
        totalPages={5} 
        onPageChange={mockPageChange} 
      />
    );
    
    // Click on Next button
    fireEvent.click(screen.getByLabelText('Next page'));
    
    // Check callback is called with next page
    expect(mockPageChange).toHaveBeenCalledTimes(1);
    expect(mockPageChange).toHaveBeenCalledWith(4);
  });
}); 