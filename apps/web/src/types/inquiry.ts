interface InquiryLink {
  title: string;
  link: string;
  description?: string;
}

interface InquiryDto {
  id: string;
  title: string;
  category: string;
  progress: string;
  created: string;
}

export type { InquiryDto, InquiryLink };
