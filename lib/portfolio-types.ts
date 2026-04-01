export type PortfolioStatus = "draft" | "published";

export type PortfolioItem = {
  id: string;
  route: string;
  title: string;
  summary: string;
  stack: string[];
  status: PortfolioStatus;
  createdAt: string;
  updatedAt: string;
};

export type PortfolioItemInput = {
  route: string;
  title: string;
  summary: string;
  stack: string[];
  status: PortfolioStatus;
};
