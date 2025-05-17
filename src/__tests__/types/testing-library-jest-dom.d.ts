// Type definitions for @testing-library/jest-dom
// Extends the Jest matchers to provide DOM-specific matchers
import '@testing-library/jest-dom';

interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R;
  toHaveTextContent(text: string | RegExp): R;
  toBeVisible(): R;
  toBeChecked(): R;
  toBeDisabled(): R;
  toBeEnabled(): R;
  toBeEmpty(): R;
  toBeEmptyDOMElement(): R;
  toBeInvalid(): R;
  toBeRequired(): R;
  toBeValid(): R;
  toContainElement(element: HTMLElement | null): R;
  toContainHTML(htmlText: string): R;
  toHaveAccessibleDescription(description?: string | RegExp): R;
  toHaveAccessibleName(name?: string | RegExp): R;
  toHaveAttribute(attr: string, value?: any): R;
  toHaveClass(...classNames: string[]): R;
  toHaveFocus(): R;
  toHaveFormValues(expectedValues: Record<string, any>): R;
  toHaveStyle(css: string | Record<string, any>): R;
  toHaveTextContent(text: string | RegExp): R;
  toHaveValue(value?: string | string[] | number | null): R;
  toBeInTheDocument(): R;
  toBePartiallyChecked(): R;
}

declare global {
  namespace jest {
    interface Matchers<R> extends CustomMatchers<R> {}
    interface Expect extends CustomMatchers {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
} 