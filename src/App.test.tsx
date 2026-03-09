import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders Vite and React logos', () => {
    render(<App />)
    const viteLogo = screen.getByAltText('Vite logo')
    const reactLogo = screen.getByAltText('React logo')
    expect(viteLogo).toBeInTheDocument()
    expect(reactLogo).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(<App />)
    const title = screen.getByText('Vite + React')
    expect(title).toBeInTheDocument()
  })

  it('renders initial count as 0', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /count is 0/i })
    expect(button).toBeInTheDocument()
  })

  it('increments count when button is clicked', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /count is/i })
    fireEvent.click(button)
    expect(screen.getByText('count is 1')).toBeInTheDocument()
  })

  it('increments count multiple times', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /count is/i })
    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)
    expect(screen.getByText('count is 3')).toBeInTheDocument()
  })

  it('renders HMR instruction text', () => {
    render(<App />)
    const hmrText = screen.getByText(/Edit/i)
    expect(hmrText).toBeInTheDocument()
  })

  it('renders links with correct href attributes', () => {
    render(<App />)
    const viteLink = screen.getByRole('link', { name: /Vite logo/i })
    const reactLink = screen.getByRole('link', { name: /React logo/i })
    expect(viteLink).toHaveAttribute('href', 'https://vite.dev')
    expect(reactLink).toHaveAttribute('href', 'https://react.dev')
  })

  it('links open in new tab', () => {
    render(<App />)
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
    })
  })
})