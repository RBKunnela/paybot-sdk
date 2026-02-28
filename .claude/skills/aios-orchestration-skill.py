#!/usr/bin/env python3
"""
AIOS Orchestration Skill - Prototype

This skill demonstrates the advantages of using skills over commands:
- Context forking (no context pollution)
- Auto model routing (no manual tier selection)
- Parameter enforcement (validation + auto-injection)
- Cleaner interface

Usage:
    /aios-orchestration "Create PRD for task orchestration system"
"""

import json
import re
import subprocess
import time
from typing import Dict, Optional, Tuple
from enum import Enum

class ModelTier(Enum):
    """AIOS Model Tiers with auto-routing"""
    HAIKU = "haiku"      # Simple tasks, search, single-file reads
    SONNET = "sonnet"    # Standard coding, features, bug fixes
    OPUS = "opus"        # Complex reasoning, architecture, planning

class ComplexityAnalyzer:
    """Analyzes request complexity to auto-select model tier"""

    def analyze_complexity(self, request: str) -> ModelTier:
        """Analyze request complexity and return appropriate tier"""
        request_lower = request.lower()

        # HAIKU - Simple, straightforward tasks
        if (any(word in request_lower for word in ["read", "search", "find", "list", "check"]) or
            any(word in request_lower for word in ["file", "document", "content"]) or
            len(request.split()) < 5):
            return ModelTier.HAIKU

        # OPUS - Complex, multi-step reasoning
        elif (any(word in request_lower for word in ["architecture", "design", "plan", "strategy"]) or
              any(word in request_lower for word in ["system", "complex", "comprehensive"]) or
              "how to" in request_lower or
              len(request.split()) > 15):
            return ModelTier.OPUS

        # SONNET - Default for most tasks
        else:
            return ModelTier.SONNET

class ContextForker:
    """Manages context forking to prevent pollution"""

    def create_fork(self, task_description: str) -> Dict:
        """Create a clean context fork for the task"""
        fork_id = f"fork_{int(time.time())}"

        return {
            "fork_id": fork_id,
            "task": task_description,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "isolation": "clean_context_fork"
        }

    def inject_context_headers(self, prompt: str, fork: Dict) -> str:
        """Add context headers to maintain isolation"""
        return f"""
=== AIOS CONTEXT FORK ===
Fork ID: {fork['fork_id']}
Task: {fork['task']}
Timestamp: {fork['timestamp']}
Isolation: {fork['isolation']}
========================

{prompt}
"""

class ParameterEnforcer:
    """Validates and auto-injects parameters"""

    def __init__(self):
        self.required_params = {
            "agent_type": ["general-purpose", "specialized"],
            "workflow_phase": ["research", "design", "implementation", "testing"],
            "output_format": ["markdown", "yaml", "json", "html"]
        }

    def validate_parameters(self, params: Dict) -> Tuple[bool, str]:
        """Validate parameters, return (valid, error_message)"""
        if "task_description" not in params or not params["task_description"]:
            return False, "task_description is required"

        if "model_tier" in params and params["model_tier"] not in [tier.value for tier in ModelTier]:
            return False, f"Invalid model_tier. Must be one of {[tier.value for tier in ModelTier]}"

        return True, "Valid"

    def auto_inject_missing(self, params: Dict) -> Dict:
        """Auto-inject missing reasonable parameters"""
        if "model_tier" not in params:
            complexity_analyzer = ComplexityAnalyzer()
            params["model_tier"] = complexity_analyzer.analyze_complexity(
                params.get("task_description", "")
            ).value

        if "context_isolation" not in params:
            params["context_isolation"] = True

        if "workflow_phase" not in params:
            params["workflow_phase"] = "implementation"

        return params

class AIOSOrchestrationSkill:
    """Main orchestration skill that replaces commands"""

    def __init__(self):
        self.complexity_analyzer = ComplexityAnalyzer()
        self.context_forker = ContextForker()
        self.enforcer = ParameterEnforcer()
        self.session_log = []

    def log_skill_usage(self, action: str, details: Dict):
        """Log skill usage for audit trail"""
        log_entry = {
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "action": action,
            "details": details
        }
        self.session_log.append(log_entry)
        print(f"[SKILL LOG] {action}: {details}")

    def format_request_for_agent(self, request: str, fork: Dict, model_tier: str) -> str:
        """Format the request for the agent with proper context"""
        base_prompt = f"""
You are an AIOS agent specializing in delegated tasks.

ORIGINAL REQUEST: {request}

Your task is to execute this request with expertise and precision.

CRITICAL RULES:
- You are a specialist agent, NOT the orchestrator
- Follow your specialized instructions exactly
- Generate output in the appropriate format
- Return complete, polished work

CONTEXT ISOLATION:
- This is a clean context fork
- No previous conversation context
- Focus solely on this request
"""

        return self.context_forker.inject_context_headers(base_prompt, fork)

    def spawn_agent_with_fork(self, request: str, model_tier: Optional[str] = None) -> Dict:
        """Spawn agent with context forking and auto model routing"""

        print("\n" + "="*60)
        print("🤖 AIOS ORCHESTRATION SKILL ACTIVATED")
        print("="*60)

        # Step 1: Auto-select model tier if not provided
        if not model_tier:
            model_tier = self.complexity_analyzer.analyze_complexity(request).value
            print(f"🎯 Auto-selected model tier: {model_tier.upper()}")

        # Step 2: Create context fork
        fork = self.context_forker.create_fork(request)
        print(f"🔀 Created context fork: {fork['fork_id']}")

        # Step 3: Validate and prepare parameters
        params = {
            "task_description": request,
            "model_tier": model_tier,
            "context_isolation": True
        }

        is_valid, message = self.enforcer.validate_parameters(params)
        if not is_valid:
            print(f"❌ Parameter validation failed: {message}")
            return {"success": False, "error": message}

        # Step 4: Auto-inject any missing parameters
        params = self.enforcer.auto_inject_missing(params)
        print(f"✅ Parameters validated and enhanced")

        # Step 5: Show what will happen
        print(f"\n🚀 What will happen:")
        print(f"   • Context will be forked (clean isolation)")
        print(f"   • Agent will be spawned with {model_tier} model")
        print(f"   • Task: {request}")
        print(f"   • Result will be returned in clean context")

        # Step 6: Confirm before execution
        print(f"\n🤔 Execute this task?")
        print("   Type 'yes' to continue, or anything else to cancel")

        try:
            confirmation = input("   Your choice: ").strip().lower()
            if confirmation not in ['yes', 'y', 'continue']:
                print("❌ Task cancelled by user")
                return {"success": False, "error": "User cancelled"}

            # Step 7: Execute the task
            print(f"\n🔥 EXECUTING TASK...")
            print(f"[{time.strftime('%H:%M:%S')}] Spawning agent with {model_tier} model")

            # Simulate Task execution (in real implementation, this would call Task)
            result = self.simulate_task_execution(request, fork, model_tier)

            # Step 8: Return result
            print(f"\n✅ TASK COMPLETED!")
            print(f"[{time.strftime('%H:%M:%S')}] Agent returned result")
            print(f"Context fork {fork['fork_id']} can now be cleaned up")

            self.log_skill_usage("agent_spawned", {
                "request": request,
                "model_tier": model_tier,
                "fork_id": fork['fork_id'],
                "success": True
            })

            return {
                "success": True,
                "result": result,
                "model_used": model_tier,
                "context_fork": fork['fork_id']
            }

        except KeyboardInterrupt:
            print(f"\n⚠️ Task interrupted by user")
            return {"success": False, "error": "Task interrupted"}
        except Exception as e:
            print(f"\n❌ Error: {e}")
            return {"success": False, "error": str(e)}

    def simulate_task_execution(self, request: str, fork: Dict, model_tier: str) -> str:
        """Simulate Task execution (in real implementation, replace with actual Task call)"""
        print(f"   📊 Analyzing complexity: {model_tier}")
        print(f"   🔀 Using context fork: {fork['fork_id']}")
        print(f"   🎯 Executing task...")

        # Simulate work based on model tier
        if model_tier == "haiku":
            time.sleep(1)
            return f"Simple task result for: {request}"
        elif model_tier == "sonnet":
            time.sleep(2)
            return f"Standard task result for: {request}\n- Analysis complete\n- Output generated"
        else:  # opus
            time.sleep(3)
            return f"Complex task result for: {request}\n- Multi-step reasoning complete\n- Architecture designed\n- Implementation plan ready"

    def interactive_mode(self):
        """Run the skill in interactive mode"""
        print("\n🎮 AIOS ORCHESTRATION SKILL - INTERACTIVE MODE")
        print("Type 'help' for commands or 'quit' to exit")

        while True:
            try:
                user_input = input("\n🎯 Your request: ").strip()

                if user_input.lower() == 'quit':
                    print("👋 Goodbye!")
                    break
                elif user_input.lower() == 'help':
                    self.show_help()
                    continue
                elif user_input.lower() == 'status':
                    self.show_status()
                    continue
                elif not user_input:
                    continue

                # Process the request
                result = self.spawn_agent_with_fork(user_input)

                if result["success"]:
                    print(f"\n📋 RESULT: {result['result']}")
                    print(f"🔧 Used model: {result['model_used']}")
                    print(f"🔀 Context fork: {result['context_fork']}")

            except KeyboardInterrupt:
                print("\n\n⚠️ Use 'quit' to exit")
            except EOFError:
                print("\n👋 Goodbye!")
                break

    def show_help(self):
        """Show help information"""
        print("\n" + "="*50)
        print("🆘 HELP - AIOS Orchestration Skill")
        print("="*50)
        print("\n🎯 AVAILABLE COMMANDS:")
        print("   help      - Show this help")
        print("   status    - Show skill status")
        print("   quit      - Exit the skill")

        print("\n🤖 AUTO MODEL ROUTING:")
        print("   Haiku  - Simple tasks (search, read, find)")
        print("   Sonnet - Standard tasks (coding, features)")
        print("   Opus   - Complex tasks (architecture, planning)")

        print("\n✨ SKILL BENEFITS:")
        print("   • Context forking (no pollution)")
        print("   • Auto model selection")
        print("   • Parameter validation")
        print("   • Clean isolation")
        print("   • Audit logging")
        print("="*50 + "\n")

    def show_status(self):
        """Show current skill status"""
        print("\n" + "="*40)
        print("📊 SKILL STATUS")
        print("="*40)
        print(f"🔀 Context forks created: {len([log for log in self.session_log if 'fork_id' in log.get('details', {})])}")
        print(f"🤖 Agents spawned: {len(self.session_log)}")
        print(f"📋 Session log entries: {len(self.session_log)}")
        print("="*40 + "\n")

def main():
    """Main entry point for the skill"""
    skill = AIOSOrchestrationSkill()

    # Check if running in interactive mode
    if len(sys.argv) > 1 and sys.argv[1] == "--interactive":
        skill.interactive_mode()
    else:
        # Single request mode
        if len(sys.argv) > 1:
            request = " ".join(sys.argv[1:])
            result = skill.spawn_agent_with_fork(request)

            if result["success"]:
                print(f"\n✅ SUCCESS: {result['result']}")
            else:
                print(f"\n❌ FAILED: {result['error']}")
        else:
            print("Usage:")
            print("  python aios-orchestration-skill.py 'your request'")
            print("  python aios-orchestration-skill.py --interactive")
            print("\nOr use as a Claude Code skill with /aios-orchestration")

if __name__ == "__main__":
    import sys
    main()