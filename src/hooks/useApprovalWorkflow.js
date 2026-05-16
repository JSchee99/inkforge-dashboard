import { useState, useCallback } from 'react';
import { useApproval } from '../context/ApprovalContext';

export const useApprovalWorkflow = (checkpointId) => {
  const approval = useApproval();
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get current status
  const currentStatus = approval.getApprovalStatus(checkpointId);

  // Handle approval
  const handleApprove = useCallback(async (feedbackText = '') => {
    setIsSubmitting(true);
    try {
      approval.approveCheckpoint(checkpointId, feedbackText);
      setFeedback('');
      return true;
    } catch (error) {
      console.error('Failed to approve checkpoint:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [approval, checkpointId]);

  // Handle revision request
  const handleRequestRevision = useCallback(async (feedbackText = '') => {
    setIsSubmitting(true);
    try {
      approval.requestRevision(checkpointId, feedbackText);
      setFeedback('');
      return true;
    } catch (error) {
      console.error('Failed to request revision:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [approval, checkpointId]);

  // Handle rejection
  const handleReject = useCallback(async (feedbackText = '') => {
    setIsSubmitting(true);
    try {
      approval.rejectCheckpoint(checkpointId, feedbackText);
      setFeedback('');
      return true;
    } catch (error) {
      console.error('Failed to reject checkpoint:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [approval, checkpointId]);

  // Check if can approve
  const canApprove = currentStatus && currentStatus.status !== 'approved';

  // Check if all required checkpoints are approved
  const allCheckpointsApproved = approval.allCheckpointsApproved();

  return {
    currentStatus,
    feedback,
    setFeedback,
    isSubmitting,
    handleApprove,
    handleRequestRevision,
    handleReject,
    canApprove,
    allCheckpointsApproved,
  };
};

export default useApprovalWorkflow;
