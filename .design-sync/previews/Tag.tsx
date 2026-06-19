import React from 'react';
import { Tag } from 'd22-design-system';

export const AllCategories = () => (
  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', padding: 16, alignItems: 'center' }}>
    <Tag category="vida" />
    <Tag category="auto" />
    <Tag category="residencial" />
    <Tag category="saude" />
    <Tag category="empresarial" />
  </div>
);
