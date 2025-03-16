const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3010';

console.log('Using API base URL:', API_BASE_URL);

export const getInterviewFlow = async (positionId: string) => {
    const response = await fetch(`${API_BASE_URL}/positions/${positionId}/interviewFlow`);
    if (!response.ok) {
        throw new Error('Failed to fetch interview flow');
    }
    return response.json();
};

export const getCandidates = async (positionId: string) => {
    const response = await fetch(`${API_BASE_URL}/positions/${positionId}/candidates`);
    if (!response.ok) {
        throw new Error('Failed to fetch candidates');
    }
    return response.json();
};

export const updateCandidateStage = async (candidateId: string, newStepId: string) => {
    const response = await fetch(`${API_BASE_URL}/candidates/${candidateId}/stage`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            applicationId: candidateId,
            currentInterviewStep: newStepId,
        }),
    });
    
    if (!response.ok) {
        throw new Error('Failed to update candidate stage');
    }
    return response.json();
};

// Mock data for testing when the API is not available
export const getMockInterviewFlow = (positionId: string) => {
    console.log('Using mock interview flow data for position:', positionId);
    return {
        positionName: `Position ${positionId}`,
        interviewFlow: {
            id: 1,
            description: "Standard development interview process",
            interviewSteps: [
                {
                    id: 1,
                    interviewFlowId: 1,
                    interviewTypeId: 1,
                    name: "Initial Screening",
                    orderIndex: 1
                },
                {
                    id: 2,
                    interviewFlowId: 1,
                    interviewTypeId: 2,
                    name: "Technical Interview",
                    orderIndex: 2
                },
                {
                    id: 3,
                    interviewFlowId: 1,
                    interviewTypeId: 3,
                    name: "Manager Interview",
                    orderIndex: 3
                }
            ]
        }
    };
};

export const getMockCandidates = (positionId: string) => {
    console.log('Using mock candidates data for position:', positionId);
    return [
        {
            fullName: "Jane Smith",
            currentInterviewStep: "Technical Interview",
            averageScore: 4
        },
        {
            fullName: "Carlos García",
            currentInterviewStep: "Initial Screening",
            averageScore: 0
        },
        {
            fullName: "John Doe",
            currentInterviewStep: "Manager Interview",
            averageScore: 5
        }
    ];
}; 