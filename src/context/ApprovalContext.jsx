import React, { createContext, useContext, useState, useCallback } from 'react';

const ApprovalContext = createContext();

export const ApprovalProvider = ({ children }) => {
  const [approvals, setApprovals] = useState({
    checkpoint1: {
      status: 'approved',
      feedback: '',
      approvedAt: '2026-05-10T14:32:00Z',
      approvedBy: 'user@example.com',
    },
    checkpoint2: {
      status: 'in_progress',
      feedback: '',
      approvedAt: null,
      approvedBy: null,
    },
    checkpoint3: {
      status: 'pending',
      feedback: '',
      approvedAt: null,
      approvedBy: null,
    },
    checkpoint4: {
      status: 'pending',
      feedback: '',
      approvedAt: null,
      approvedBy: null,
    },
  });

  const [approvalHistory, setApprovalHistory] = useState([
    {
      id: 1,
      checkpoint: 'Checkpoint 1: Outline',
      action: 'approved',
      timestamp: '2026-05-10T14:32:00Z',
      user: 'user@example.com',
      feedback: 'Excellent outline and character development',
    },
  ]);

  // Approve a checkpoint
  const approveCheckpoint = useCallback((checkpointId, feedback = '', user = 'user@example.com') => {
    setApprovals(prev => ({
      ...prev,
      [checkpointId]: {
        ...prev[checkpointId],
        status: 'approved',
        feedback,
        approvedAt: new Date().toISOString(),
        approvedBy: user,
      },
    }));

    addApprovalHistory({
      checkpoint: checkpointId,
      action: 'approved',
      user,
      feedback,
    });
  }, []);

  // Request revision on a checkpoint
  const requestRevision = useCallback((checkpointId, feedback = '', user = 'user@example.com') => {
    setApprovals(prev => ({
      ...prev,
      [checkpointId]: {
        ...prev[checkpointId],
        status: 'revision_requested',
        feedback,
        approvedAt: new Date().toISOString(),
        approvedBy: user,
      },
    }));

    addApprovalHistory({
      checkpoint: checkpointId,
      action: 'revision_requested',
      user,
      feedback,
    });
  }, []);

  // Reject a checkpoint
  const rejectCheckpoint = useCallback((checkpointId, feedback = '', user = 'user@example.com') => {
    setApprovals(prev => ({
      ...prev,
      [checkpointId]: {
        ...prev[checkpointId],
        status: 'rejected',
        feedback,
        approvedAt: new Date().toISOString(),
        approvedBy: user,
      },
    }));

    addApprovalHistory({
      checkpoint: checkpointId,
      action: 'rejected',
      user,
      feedback,
    });
  }, []);

  // Add to approval history
  const addApprovalHistory = useCallback((entry) => {
    setApprovalHistory(prev => [
      {
        id: prev.length + 1,
        timestamp: new Date().toISOString(),
        ...entry,
      },
      ...prev,
    ]);
  }, []);

  // Get approval status for a checkpoint
  const getApprovalStatus = useCallback((checkpointId) => {
    return approvals[checkpointId] || null;
  }, [approvals]);

  // Check if all checkpoints are approved
  const allCheckpointsApproved = useCallback(() => {
    return Object.values(approvals).every(approval => approval.status === 'approved');
  }, [approvals]);

  const value = {
    approvals,
    approvalHistory,
    approveCheckpoint,
    requestRevision,
    rejectCheckpoint,
    getApprovalStatus,
    allCheckpointsApproved,
  };

  return (
    <ApprovalContext.Provider value={value}>
      {children}
    </ApprovalContext.Provider>
  );
};

export const useApproval = () => {
  const context = useContext(ApprovalContext);
  if (!context) {
    throw new Error('useApproval must be used within ApprovalProvider');
  }
  return context;
};

export default ApprovalContext;
