# Mock Interview Questions

This folder contains the static question banks for the AI Mock Interview system.

## Directory Structure
- `kvs/prt/`
- `kvs/tgt/`
- `kvs/pgt/`
- `nvs/prt/`
- `nvs/tgt/`
- `nvs/pgt/`
- `ssc/cgl/`
- `ssc/chsl/`
- `ssc/mts/`
- `ssc/gd/`
- `ssc/cpo/`

## File Naming Convention
The filename must be lowercase and spaces should be replaced by underscores.
For example, if the Subject is "Quantitative Aptitude", the file must be named `quantitative_aptitude.ts`.

## File Content Template
```typescript
import { InterviewQuestion } from "../../../config/types";

export const questions: InterviewQuestion[] = [
  // Add 20-30 bilingual questions here
];
```

