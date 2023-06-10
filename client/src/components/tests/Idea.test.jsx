import { render, screen } from "@testing-library/react";
import Idea from "../Idea";

const mockIdea = {
  "id": 17,
  "section_id": 12,
  "name": "Great idea!",
  "description": "Wowo well done!",
  "photo_url": "uploads/1686294428608-24438629-olga-budko-hl0W9gS0C6k-unsplash.jpg"
};

it("should display idea name", () => {
  render(<Idea idea={mockIdea} ideasProp={[]} />); 
  const ideaName = screen.getByText("Great idea!");
  expect(ideaName).toBeInTheDocument();
});
