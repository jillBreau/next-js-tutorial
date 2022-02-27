import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

describe('Home', () => {
  it('renders a profile picture', () => {
    render(<Home />)

    const image = screen.getByRole('img', {
      src: /images\/profile.jpg/i,
      alt: /Jillian Breau/i,
    })

    expect(image).toBeInTheDocument()
  })
  it('renders a heading with name', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /Jillian Breau/i,
    })

    expect(heading).toBeInTheDocument()
  })
  it('renders a link to tutorial', () => {
    render(<Home />)

    const link = screen.getByRole('link', {
      name: /tutorial/i,
      href: /nextjs.org\/learn/i,
    })

    expect(link).toBeInTheDocument()
  })
  it('renders a Topic heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /Topic/i,
    })

    expect(heading).toBeInTheDocument()
  })
  it('renders a link to Pre-rendering page', () => {
    render(<Home />)

    const link = screen.getByRole('link', {
      name: /Two Forms of Pre-rendering/i,
      href: /posts\/pre-rendering/i,
    })

    expect(link).toBeInTheDocument()
  })
  it('does not render a link to Home page', () => {
    render(<Home />)

    const links = screen.queryAllByRole('link', {
      name: /Jillian Breau/i,
      href: /\//i,
    })

    expect(links.length).toEqual(0);
  })
})